import React from 'react'

const useMediaQuery = (query: string) => {
    const [match, setMatch] = React.useState<boolean>(false);

    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== match) setMatch(media.matches);
        const listener = () => {
            setMatch(media.matches);
        };
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        }
    }, [match, query]);

    return match;
}

export default useMediaQuery;