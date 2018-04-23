import { connect } from 'dva';
import Menus from './Menus';
import style from './MainLayout.less';

const MainLayout = ({ children, dispatch, menus }) => {
  let { selectedTab, hidden } = menus;
  window.addEventListener("orientationchange", function (event) {
    const orientation = window.orientation === 90 || window.orientation === -90
    dispatch({
      type: 'menus/hiddenClick',
      payload: {
        hidden: orientation
      }
    })
  }, false);
  return (
    <div
      style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
      }}>
      <div
        className={`${style.content} ${hidden
          ? style.contentHidden
          : ''}`}>
        <div className={style.contentWarp}>
          {children}
        </div>
      </div>
      <Menus selectedTab={selectedTab} hidden={hidden} />
    </div>
  )
}

function mapStateToProps({ menus }) {
  return { menus };
}
export default connect(mapStateToProps)(MainLayout);
