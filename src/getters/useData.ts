import * as React from 'react';

/**
 * A custom hook to fetch the data from a provided url
 * @param url 
 * @returns {data, error, loading}
 */
export const useData = (url: string) => {

    const [data,setData] = React.useState(null);
    const [error,setError] = React.useState<Error>();
    const [loading,setLoading] = React.useState(false);

    // the excercise specifications, stated no external libraries, but come on
    // an axios call isn't too much to ask
    React.useEffect(() => {
			const fetchData = async (): Promise<void> => {
				try {
					setLoading(true);

					const response = await fetch(url)            
					.then(result => result.json());
					
					setData(response);

				} catch(err) {
						console.log({err});

						if (err instanceof Error) {
								setError(err);
						} 
						setError(new Error('generic error'));           
				} finally {
						setLoading(false)
				}  
		} 
        fetchData();
	}, [url]);

	return { data, error, loading }
}
