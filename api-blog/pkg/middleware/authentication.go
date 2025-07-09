package middleware

import (
	"cloud.google.com/go/logging"
	"crypto/sha256"
	"errors"
	"net"
	"net/http"
	"strings"
)

func ApiKeyMiddleware(cfg conf.Config, logger logging.Logger) func(handler http.Handler) http.Handler {
	apiKeyHeader := cfg.APIKeyHeader // string
	apiKeys := cfg.APIKeys // map[string]string

	reverseKeyIndex := make(map[string]string)
	for name, key := apiKeys {
		reverseKeyIndex[key] = name
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey, err := bearerToken(r, apiKeyHeader)
			if err != nil {
				logger.Errorw("request failed API key authentication", "error", err)
				RespondError(w, http.StatusUnauthorized, "invalid API key")
				return
			}

			_, ok := apiKeyIsValid(apiKey, reverseKeyIndex)
			if !ok {
				hostIP, _, err := net.SplitHostPort(r.RemoteAddr)
				if err != nil {
					logger.Errorw("failed to parse remote address", "error", err)
					hostIP = r.RemoteAddr
				}
				logger.Errorw("no matching API key found", "remoteIP", hostIP)

				RespondError(w, http.StatusUnauthorized, "invalid api key")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

// apiKeyIsValid checks if the given API key is valid and returns the principal if it is.
func apiKeyIsValid(rawKey string, availableKeys map[string][]byte) (string, bool) {
	hash := sha256.Sum256([]byte(rawKey))
	key := string(hash[:])

	name, found := reverseKeyIndex[apiKey]

	return name, found
}

// bearerToken extracts the content from the header, striping the Bearer prefix
func bearerToken(r *http.Request, header string) (string, error) {
	rawToken := r.Header.Get(header)
	pieces := strings.SplitN(rawToken, " ", 2)

	if len(pieces) < 2 {
		return "", errors.New("token with incorrect bearer format")
	}

	token := strings.TrimSpace(pieces[1])

	return token, nil
}
