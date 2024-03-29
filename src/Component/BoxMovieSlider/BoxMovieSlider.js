import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './BoxMovieSlider.css';
import { Link } from 'react-router-dom';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { Api } from '../Api';
import Loading from '../Loading/Loading';
import LazyLoad from 'react-lazy-load';

export default function BoxMovieSlider(props) {
    const { type = 'movie', titleprops = 'Top Movie:', sort ,order} = props;

    const [showtitle, setshowtitle] = useState(-1);
    const [MovieList, setMovieList] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Api}Movie?type=${type}&_sort=${sort}`);
                const data = await response.json();
                setMovieList(data);
                setImageLoaded(true); 
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };

        fetchData();
    }, []);



    const swiperParams = {
        slidesPerView: 6,
        spaceBetween: 30,
        breakpoints: {
            120: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            350: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            542: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            716: {
                slidesPerView: 5,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        },
    };

    return (
        <div className="BoxMovieSlider">
            <div className="titlebm">{titleprops}</div>

            <>

                <Swiper {...swiperParams} className="BoxMov">
                    {imageLoaded ?
                        MovieList.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                onMouseLeave={() => setshowtitle(-1)}
                                onMouseEnter={() => setshowtitle(index)}
                                className="p-rel"
                            >
                                <span className="itemboxmovie">
                                <LazyLoad offset={300}><img src={item.post_image_link} alt="" /></LazyLoad>   
                                    <h2>{item.title}</h2>
                                    <p>{item.genre}</p>
                                </span>
                                {showtitle === index && (
                                    <Link to={`/${type}/${item.id}/${item.item}`}>
                                        <div className="hoverbox">
                                            <FaRegCirclePlay />
                                            <p className="imdbrate">Imdb: {item.imdb}</p>
                                        </div>
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))

                        :
                        <> 
{Array.from({ length: 9 }, (_, index) => (
    <SwiperSlide key={index} >
      <Loading height={'200px'} />
    </SwiperSlide>
  ))}
      </>
                    }
                </Swiper>

            </>

        </div>
    );
}
