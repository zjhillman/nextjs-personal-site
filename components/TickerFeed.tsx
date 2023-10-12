
const TickerFeed = ({children}: {children: string}) => {
    return (
        <div className="overflow-hidden m-auto whitespace-nowrap">
            <div className="pl-[100%] inline-block transform animate-ticker">{children}</div>
        </div>
    );
}

export default TickerFeed;