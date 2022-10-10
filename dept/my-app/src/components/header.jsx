import SpaceLogo from "../assets/logo";

const Header = ({currentPage}) => {
  return (
    <div className='header'>
      <div className="logo">
        <SpaceLogo />
      </div>
      <div className="headerTitle">
        {currentPage}
      </div>
    </div>
  )
}

export default Header;
