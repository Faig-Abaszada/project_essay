// import './searchInput.scss'

export default function SearchInput() {
    return (
        <div className="search-area">
            <div className="icon-area">
                {/*<icon-component*/}
                {/*:color="colorUtilities.$black_color_3" icon-name="search" icon-size="23"/>*/}
            </div>
            <div className="search-area-left">
                <div className="search-tag">
                <span className="text-body-md">{'tag'}</span>
                </div>
                {/*<icon-component*/}
                {/*:color="colorUtilities.$black_color_4"*/}
                {/*class="close-icon"*/}
                {/*icon-name="close"*/}
                {/*icon-size="16" @click.stop="removeTag(tag, 'search')"/>*/}
            </div>
            <div className="input-area">
                <input
                    placeholder="Search..."
                    type="text"
                />
            </div>
        </div>

//     <div className="search-area-right">
//         <button className="clear-tags-button text-body-md"
//         @click="clearSearchTags"
//         :disabled="searchedTags.length < 1">
//         {{$t('buttons.clear')}}
//     </button>
// </div>
// </div>
)
}