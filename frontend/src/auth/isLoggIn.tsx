import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const userId = localStorage.getItem("userId");
      // If there is no access token we redirect to "/" page.
      if (!userId) {
        Router.push("/login"); // what is replace? nextjs replace na to replace the route
        return null;
      }
      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};

export default withAuth;