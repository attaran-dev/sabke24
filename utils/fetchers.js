// import db from '../data/database.json'

export async function getPosts() {
    const db = await fetch('../data/database.json')
    const data = await db.json();
    const posts = await data.posts; 
    return posts;
}

export async function getPost(url) {
    const db = await fetch('../data/database.json')
    const data = await db.json();
    const posts = await data.posts; 
    const post = posts.find((post) => post.url === url);
    return post;
}

export function sortPosts(postsArray, resultNum, sortFunction, filterFunction) {
    if (filterFunction) {
      const filteredArray = postsArray.filter(filterFunction);
      const filteredSortedArray = filteredArray.sort(sortFunction);
      const result = filteredSortedArray.slice(0, +resultNum);
      return result;
    }
    const sortedArray = postsArray.sort(sortFunction);
    const result = sortedArray.slice(0, +resultNum);
    return result;
  };

  export function getPostsByRange(postsArray, page, range ){
    
  }