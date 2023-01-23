import React from 'react'


const NewsItem = (props)=>  {

 

        return (
            <>
                <div className="card my-3">
               
                    <span style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}} className="position-absolute top-0 start-30 translate-middle badge rounded-pill bg-danger">
                        {props.source}

                    </span>
                    <img src={props.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>

                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.date).toGMTString()}</small></p>
                        <a href={props.url} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                    </div>
               
            </>
        )
    }


export default NewsItem
