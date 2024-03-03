const loadData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    console.log(data)
    const posts = data.posts
    displayData(posts);
}

const displayData = (posts) => {
//1. get the container
const postContainer = document.getElementById('post-container')

// //Clear phone container card before
// phoneContainer.textContent = '';

// //Display show all button if there are more than 12 phones
// const showAllContainer = document.getElementById('show-all-container');
// if(phones.length > 12 && !isShowAll){
//     showAllContainer.classList.remove('hidden');
// }else{
//     showAllContainer.classList.add('hidden');
// }

//Display only first 12 phones if not show all
// if(!isShowAll){
//     phones = phones.slice(0,12);
// }

posts.forEach(post => {
    //Creating a div
    const postCard = document.createElement('div');
    postCard.classList = `bg-[#F3F3F5] rounded-3xl p-10 flex flex-col gap-4`

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
                    <i
                        class="fa-regular fa-envelope bg-[#10B981] text-white p-1 rounded-[50px]"></i>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    //4. AppendChild
    postContainer.appendChild(postCard);
});
// //Hide loading spinner
// toggleLoadingSpinner(false);
}

loadData();