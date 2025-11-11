import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MenuTop = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <div class="menu_top">
      <ul>
        <li>
          <a href="/trang1">Trang 1</a>
        </li>
        <li>
          <a href="/trang2">
            Trang 2
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="https://giadinh.edu.vn/de-an-tuyen-sinh-truong-dai-hoc-gia-dinh-nam-2024"
          >
      
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="https://giadinh.edu.vn/truong-dai-hoc-gia-dinh-thong-bao-3-cong-khai-nam-hoc"
          >
  
          </a>
        </li>
        <li>
          <a target="blank" href="https://sinhvien.giadinh.edu.vn/">
  
          </a>
        </li>
        <li>
          <a target="blank" href="https://lms.giadinh.edu.vn/">
      
          </a>
        </li>
        <li>
          <a target="blank" href="https://library.giadinh.edu.vn/search">
           
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="#"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </a>
        </li>

        <li>
        {user ? (
                <>
                  <span className="username">👤 {user.username}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <a href="/login" className="login-link">
                  Đăng nhập
                </a>
              )}
        </li>
      </ul>
    </div>
  );
};
export default MenuTop;
