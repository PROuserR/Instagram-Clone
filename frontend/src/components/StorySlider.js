import React, { useContext } from 'react'
import Stories from 'react-insta-stories';
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import { ReactComponent as SendIcon } from '../assets/send.svg';
import { StoryContext } from "../StoryContext";

const StorySlider = ({ userId, story }) => {
    const [storyContext, setStoryContext] = useContext(StoryContext);

    const timeDelta = (string_date) => {
        let date = new Date(string_date)
        let now = new Date();
        let delta = (now - date) / 1000;
        let ago = " secs ago";
        if (delta > 60) {
            delta /= 60;
            ago = " mins ago";
            if (delta > 60) {
                delta /= 60;
                ago = " hours ago";
                if (delta > 24) {
                    delta /= 24;
                    ago = " days ago";
                }
            }
        }
        delta = Math.round(delta, 2)
        return delta + ago;
    }

    let stories = []

    for (let index = 0; index < story.storyPhotoes.length; index++) {
        stories = stories.concat({
            url: `http://127.0.0.1:8000/media/${story.storyPhotoes[index]}`,
            header: {
                heading: story.username,
                subheading: timeDelta(story.dateAdded),
                profileImage: `http://127.0.0.1:8000${story.profileImage}`,
            },

        })
    }

    if (!storyContext)
        return null

    return (
        <div className='fixed max-w-4xl h-screen w-screen top-0 -left-4 2xl:left-80 z-20'>
            <Stories
                stories={stories}
                defaultInterval={stories.length * 4000}
                width={'100%'}
                height={'95%'}
                onAllStoriesEnd={() => setStoryContext(false)}
            />
            <section className='flex w-full space-x-2 items-center p-2 absolute bottom-2 bg-white dark:bg-black'>
                <input className='w-5/6 bg-transparent outline-none p-2 border-2 rounded-xl mr-auto' placeholder='Send message' />
                <div className='flex space-x-3'>
                    <HeartIcon />
                    <SendIcon />
                </div>
            </section>
        </div>
    );
}
export default StorySlider