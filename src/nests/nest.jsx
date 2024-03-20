import { useParams } from "react-router-dom"

const Nest = () => {
    const {id} = useParams();
    return (
    <div>Nest wiht id: {id}</div>
    )
}

export default Nest