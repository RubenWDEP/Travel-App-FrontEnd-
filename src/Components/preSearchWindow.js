import './preSearchWindow.css'


function PreSearchWindow({ preSearhBarResponse, setValue, setPreSearchResponse, setSearchBar }) {


    return (
        <>
            {preSearhBarResponse &&
                <ul className='preSearch-style'>
                    {preSearhBarResponse.map((result, index) => {
                        return <li key={index} onClick={e => {
                            setValue(result.lugar);
                            setSearchBar(result.lugar);
                            setPreSearchResponse(null);
                        }}>
                            {result.lugar}
                        </li>
                    })}
                </ul>
            }
        </>




    );
}

export default PreSearchWindow;