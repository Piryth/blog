interface IProps {
    job: string
    dates: string
    company: string
    description: string
    imageUrl?: string
}

export default function Experience(props: IProps) {

    return <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
            <p className="text-sm text-slate-500 dark:text-slate-500">{props.dates}</p>
        </div>
        <div className="md:col-span-3">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{props.job}</h3>
                {
                    props.imageUrl ?
                        <img src={props.imageUrl}
                             width={64} alt="Boulanger logo"/>
                        :
                        <span></span>
                }
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-3">{props.company}</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {props.description}
            </p>
        </div>
    </div>
}