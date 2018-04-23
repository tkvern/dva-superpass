import { connect } from 'dva';
// import style from './less';

const SingleLayout = ({ children, dispatch }) => {

  return (
    <div>
      {children}
    </div>
  )
}

export default connect()(SingleLayout);
