import { useState } from 'react';
import Profile from './Profile';

// import Post from './Post';

// const news = [
//     {
//         title: "Tesla",
//         author: "Tesla",
//         description: "Tesla",
//         url: "Tesla"
//     },
//     {
//         title: "Tesla",
//         author: "Tesla",
//         description: "Tesla",
//         url: "Tesla"
//     },
//     {
//         title: "Tesla",
//         author: "Tesla",
//         description: "Tesla",
//         url: "Tesla"
//     }
// ]


// https://dev.to/canhamzacode/how-to-implement-pagination-with-reactjs-2b04
function Article() {

// const Article = () => {
    const [searchTerm, setSearchTerm] = useState("");
    // const [newsData, setNewsData] = useState(news);
    const [newsData, setNewsData] = useState([]);
    const [resultText,setResultText] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [apiKey, setApiKey] = useState("");


    const postsPerPage = 10;
    const [loading,setLoading] = useState(false);


    // Handle search button click
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Make API call to backend
        try {

            const response = await fetch(`/api/news?q=${searchTerm}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                }
            });
            const data = await response.json();
            setNewsData(data.data.articles); // assuming the response has articles as an array
            setCurrentPage(1); //reset page to 1

            const formattedResults = data.data.articles.map((article, index) => {
                return `Title: ${article.title}\nAuthor: ${article.author || "Unknown"}\nDescription: ${article.description}\nURL: ${article.url}\n\n`;
            }).join('');

            //set formatted results into the 
            setResultText(formattedResults);

        } catch (error) {
            console.error("Error fetching news:", error);
        }

        setLoading(false);
    }

    // write a function "pagination" that updates current page state when a user selects a page number 

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = newsData.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {setCurrentPage(pageNumber);

    };

    
    return (
        <div className="space-y-4 ml-8 mr-6">
            <Profile apiKey={apiKey} setApiKey={setApiKey} />
            
            <div className="text-2xl font-bold text-blue-700 mb-4">Google Me!</div>
            
            <div className="flex items-center space-x-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-400 p-2 rounded-lg w-64"
                placeholder="Enter search term (e.g., Tesla)"
                />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={handleSearch}
                >
                
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
            </button>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-semibold text-blue-700">Search Results:</h2>
                {/* <p className="text-sm text-gray-700">{resultText}</p> */}
            </div>

            {/* <Post posts={newsData} loading={loading} /> */}

            {loading ?(
                <p className="py-4">Loading...</p>
            ) : (
                
                <div className="space-y-2">
                {currentPosts.length > 0 ? (
                    currentPosts.map((article, index) => (
                        <div key={index} className="border-b border-gray-200 py-4">
                            <h3 className="text-xl font-semibold text-blue-700 hover:underline">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                            </h3>
                            <p className="text-sm text-gray-500">
                                <strong>Author:</strong> {article.author || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-700">
                                {article.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="py-4">No news found. Please try another search term.</p>
                )}
            </div>
            )}

            {/* pagination :: newsData.length refers to the number of news articles currently stored in the newsData state variable. */}

        {newsData.length > postsPerPage && (
            <div className="flex justify-center space-x-2 mt-4">
                {[...Array(Math.ceil(newsData.length / postsPerPage)).keys()].map(number => (
                     <button 
                        key={number + 1} 
                        onClick={() => paginate(number + 1)} 
                        className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                    {number + 1}
                    </button>
                ))}
        </div>
        )}
        </div>
    );
    

};

export default Article;

