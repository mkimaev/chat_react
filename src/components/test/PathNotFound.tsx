import { useLocation } from "react-router-dom";

export default function PathNotFound() {
    const location = useLocation();
    const { hash, pathname, search } = location;

    return <>
        <p style={{margin: '10em'}}>
            <h3>js-location hostname: {document.location.hostname}</h3>
            <h3>js-location path: {document.location.pathname}</h3>
            <h3>not found Router path:<mark>{pathname}</mark></h3>
            <h4>hash: {hash}</h4>
            <h4>search: {search}</h4>
        </p>


    </>
}