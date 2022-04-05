
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams()
    // 이 함수 쓰면 App.js 에서 <Route path="/movie/:id" element={<Detail />} /> id 변수의 값을 넘겨줌

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const getMovie = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        setLoading(false);

    }

    console.log(movie);
    useEffect(() => {
        getMovie();
    }, [])


    return (
        <div>
            {loading ? <h1>Loading...</h1> : (<div>
                <h1>{movie.title}</h1>
                <a href={movie.url} target="_blank"><img src={movie.medium_cover_image}></img></a>
                <p>평점 : {movie.rating}</p>
                <p>{movie.genres.map((g) => (<li key={g}>{g}</li>))}</p>
                <p>{movie.description_full}</p>
            </div>
            )}
        </div>

    )

}

export default Detail;


