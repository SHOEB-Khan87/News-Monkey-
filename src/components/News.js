import React,{useEffect,useRef,useState} from 'react'
import Spinner from '../Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem'

const  News = (props)=> {
const [articles,setArticles]=useState([])
const [loading,setLoading]=useState(true)
const [page,setPage]=useState(1)
const [totalResults,setTotalResults]=useState(0)
 
    // 0 index charectre is converted to uppercase              here characters are in lowerCase we have sliced it from     
    

  
  const updateNews= async () =>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9eb0d291e94d4a5fbcb89c6ac42ebbf2&page=${page}&pageSize=${props.pageSize}`;
   setLoading(true)
    props.setProgress(70);
    let data = await fetch(url);
    props.setProgress(70);
    let parsedata = await data.json();
setArticles(parsedata.articles)
setTotalResults(parsedata.totalResults)
setLoading(false)
    
    props.setProgress(100)
  }
  useEffect(()=>{
updateNews();
document.title = props.category.charAt(0).toUpperCase() + props.category.slice(1) + " - NewsMonkey";
  },[])
 
 const fetchMoreData = async () => {
let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9eb0d291e94d4a5fbcb89c6ac42ebbf2&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page +1)
let data = await fetch(url);  
    let parsedata = await data.json();
setArticles(articles.concat(parsedata.articles))
setTotalResults(parsedata.totalResults)
setLoading(false)
   
  };

  // handleNext = () => {
  //   this.setState({
  //     page: page + 1,
  //   })
  //   this.updateNews();
  // }
  // handlePrevious = () => {
  //   this.setState({
  //     page: page - 1,
  //   })
  //   this.updateNews();
  // }

    return (
      <>
       <h1 className='text-center' style={{ margin: "35px 0px",marginTop:"90px" }}>NewsMonkey - Top Headlines</h1>
          {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
            <div className='container'>
              <div className='row'>
                {articles.map(element => {
                  return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                      image={element.urlToImage ? element.urlToImage : "https://english.cdn.zeenews.com/sites/default/files/2022/11/10/1115288-mi7-75.jpg"} url={element.url} author={element.author ? element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                    {/* check for null */}
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
          {/* <div className='container my-3'>
            <div className="d-flex justify-content-between">
              <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious} >&#8592; Previous</button>
              <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}> Next &#8594;</button>
            </div>
          </div> */}
        

      </>
    )
        }


export default News
