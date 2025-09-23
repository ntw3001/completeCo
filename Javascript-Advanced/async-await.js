function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe", url: "https://example.com/johndoe" });
    }, 2000);
  });
}

async function getUserData() {
  try {
        console.log("Fetching user data...");
        const userData = await fetchUserData();
        console.log("User Data:", userData);
  } catch (error) {

  }
}

getUserData();
console.log("This message appears before user data is fetched.");


function fetchPostData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Got the post data");
    }, 2000);
  });
}

function fetchCommentData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Got the comment data");
    }, 2000);
  });
}

async function getBlogData() {
  try {
    console.log("Fetching blog data...");
    // const postData = await fetchPostData();
    // console.log(postData);
    // const commentData = await fetchCommentData();
    // console.log(commentData);
    const [postData, commentData] = await Promise.all([fetchPostData(), fetchCommentData()]);
    console.log(postData);
    console.log(commentData);
    console.log("Finished fetching blog data.");
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }
}

getBlogData();
console.log("This message appears before blog data is fetched.");
