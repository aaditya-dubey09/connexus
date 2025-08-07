import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUserProfileThunk } from "./store/slice/user/user.thunk";
import { useSelector } from "react-redux";


function App() {
  const { screenLoading } = useSelector((state) => state.userReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, [dispatch]);

  if (screenLoading) {
    return null;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}

export default App;
