import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routesObjects from "./routes";
import { AuthProvider } from "./context/authContext";
import { PortalProvider } from "./context/portalContext";
import { useAuth } from "./context/authContext";
import { useEffect, useState } from "react";
import AuthLayout from "./pages/auth/AuthLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { useNavigate } from "react-router-dom";
import Courses from "./pages/dashboard/Courses";
import CourseRegistered from "./pages/dashboard/CourseRegistered";
import GraduationEligibility from "./pages/dashboard/GraduationEligibility";
import Profile from "./pages/dashboard/Profile";
function App() {
  const auth = useAuth();

  const [fetchingStudent, setFetchingStudent] = useState(true);
  const [student, setStudent] = useState(null);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const studentObj = JSON.parse(localStorage.getItem("student"));
    setStudent(studentObj);
    setIsStudent(true);
    try {
      if (!studentObj) {
        setFetchingStudent(true);
      } else {
        auth.initUser(studentObj);
        setFetchingStudent(false);
      }
    } catch (err) {
      setFetchingStudent(false);
    }
  }, [isStudent]);

  return (
    <div className="">
      {fetchingStudent ? (
        <div>
          <Router>
            <AuthProvider>
              <PortalProvider>
                <Routes>
                  <Route
                    key={2}
                    path="/login"
                    element={
                      <AuthLayout>
                        <SignIn />
                      </AuthLayout>
                    }
                  ></Route>
                  <Route
                    key={3}
                    path="/signup"
                    element={
                      <AuthLayout>
                        <SignUp />
                      </AuthLayout>
                    }
                  ></Route>
                  <Route
                    key={4}
                    path="/"
                    element={
                      <DashboardLayout>
                        <Courses />
                      </DashboardLayout>
                    }
                  ></Route>
                  <Route
                    key={5}
                    path="/dashboard/courses"
                    element={
                      <DashboardLayout>
                        <CourseRegistered />
                      </DashboardLayout>
                    }
                  ></Route>
                  <Route
                    key={6}
                    path="/dashboard/eligibility"
                    element={
                      <DashboardLayout>
                                <GraduationEligibility />

                      </DashboardLayout>
                    }
                  ></Route>
                  <Route
                    key={7}
                    path="/dashboard/profile"
                    element={
                      <DashboardLayout>
                                <Profile />

                      </DashboardLayout>
                    }
                  ></Route>
                </Routes>
              </PortalProvider>
            </AuthProvider>
          </Router>
        </div>
      ) : (
        <Router>
          <AuthProvider>
            <PortalProvider>
              <Routes>
                {routesObjects.map((route) => {
                  return (
                    <Route
                      key={route.id}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
              </Routes>
            </PortalProvider>
          </AuthProvider>
        </Router>
      )}
    </div>
  );
}

export default App;
