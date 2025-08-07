import './search.scss';


export const Search = ({onClick}) => {
  return (
    <div className='search'>
        <button className='search-btn' onClick={onClick}>close</button>
        <div className="search__content">
            <h2 className='search__content-title'>Поиск</h2>
            <div className="search__content__wrapper">
                <input type="search" placeholder='Поиск по фильмам, сериалам, актерам' />
            </div>
        </div>
    </div>
  )
}
