const tabItems = [
  {
    title: 'All',
    currentPage: 'Launches',
  },
  {
    title: 'Favourites',
    currentPage: 'Favourites',
  }
];

const TabNavigator = ({currentPage, setCurrentPage}) => (
  <div className='navigator'>
    <ul>
      {tabItems.map(item => (
        <li onClick={() => setCurrentPage(item.currentPage)} className={currentPage === item.currentPage ? 'isActive' : ''}>
          <a href="#">{item.title} {currentPage}</a><
        /li>))}
    </ul>
  </div>
)

export default TabNavigator;
