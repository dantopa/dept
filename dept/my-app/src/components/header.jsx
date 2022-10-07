import SpaceLogo from "../assets/logo";

const Header = ({currentPage}) => {
  return (
    <div className='header'>
      <SpaceLogo />
      <div className="headerTitle">
        {currentPage}
      </div>
    </div>
  )
}

export default Header;
