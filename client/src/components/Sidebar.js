
import SidebarLink from "./SidebarLink";
function Sidebar(){
  return(
    <div className="sidebar">
        <div> 
            <h2>Categories</h2>
            
        </div>
        <SidebarLink text="Home" />
        <SidebarLink text="Explore" />
        <SidebarLink text="Notifications" />
        <SidebarLink text="Messages" />
        <SidebarLink text="Bookmarks" />
        <SidebarLink text="Lists" />
        <SidebarLink text="Profile" />
        <SidebarLink text="More" />
    </div>
  );
}
export default Sidebar;