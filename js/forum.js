const loadData = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    console.log(res)
    const data = await res.json()
    console.log(data)
    const postData = data.posts
    displayData(postData);
}

const displayData = (posts) => {
//1. get the container
const postContainer = document.getElementById('post-container')

postContainer.textContent = '';

posts.forEach(post => {
    //Creating a div
    const postCard = document.createElement('div');
    postCard.classList = `bg-[#F3F3F5] rounded-3xl p-10 flex flex-col gap-4`

    const highlightContainer = document.getElementById('highlight-container')
    //active color condition
    const activeColor = post.isActive ? 'bg-green-500' : 'bg-red-500';

    //innerHtml
    postCard.innerHTML = `
    <div class=" flex flex-col gap-4">
    <div class="flex gap-4">
        <div class="indicator">
            <span id="active-status" class="indicator-item badge badge-secondary border-none ${activeColor}"></span>
            <div class="grid w-[72px] h-[72px] bg-base-300 place-items-center rounded-xl"><img src="${post.image}" alt="">
            </div>
        </div>
        <div class="flex flex-col gap-5 w-full">
            <div class="flex gap-5 inter text-sm">
                <p>#<span>${post.category}</span></p>
                <p>Author: <span>${post.author.name}</span></p>
            </div>
            <h1 class="text-xl font-bold mulish">${post.title}</h1>
            <p class="text-[#12132D99]">${post.description}</p>
            <hr class="border-gray-400 border-dashed">
            <div class="flex justify-between">
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="flex items-center justify-center gap-3">
                        <i class="fa-regular fa-message"></i>
                        <span>${post.comment_count}</span>
                    </div>
                    <div class="flex items-center justify-center gap-3">
                        <i class="fa-regular fa-eye"></i>
                        <span>${post.view_count}</span>
                    </div>
                    <div class="flex items-center justify-center gap-3">
                        <i class="fa-regular fa-clock"></i>
                        <p><span>${post.posted_time}</span> min</p>
                    </div>
                </div>
                <div class=" flex items-center justify-center">
                    <button class="highlight-btn">
                    <i
                    class="fa-regular fa-envelope bg-[#10B981] text-white p-1 rounded-[50px]"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    //AppendChild
    postContainer.appendChild(postCard);

    toggleLoadingSpinner(false);

    // Add event listener to the highlight-btn inside the post card
    const highlightBtn = postCard.querySelector('.highlight-btn');
    highlightBtn.addEventListener('click', () => {
        // Create a new div for the post details
        const postDetails = document.createElement('div');
        postDetails.classList = `flex justify-between bg-white p-4 rounded-2xl gap-4 mb-4`;
        // Set the content for the post details
        postDetails.innerHTML = `
        <h3 class="w-1/2">${post.title}</h3>
            <div class="flex items-center gap-3">
                 <i class="fa-regular fa-eye"></i>
                 <span>${post.view_count}</span>
             </div>
        `;
        // Append the post details to the details container
        highlightContainer.appendChild(postDetails);

        const currentCount = getTextElementValueById('post-count')
        const updatedCount = currentCount + 1;
        setTextElementValueById('post-count', updatedCount);

    });
});

}

const getTextElementValueById = (elementId) => {
    const element = document.getElementById(elementId);
    const elementValueText = element.innerText;
    const value = parseInt(elementValueText);
    return value;
}

const setTextElementValueById = (elementId, value) => {
    const element = document.getElementById(elementId);
    element.innerText = value;
}

//Handle search button
const handleSearch = () => {
    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

        setTimeout(() => {
            loadData(searchText);
        }, 2000);
}

//toggle loading spinner
const toggleLoadingSpinner = (isLoading, delay) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
            loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden')
    }
}
