import UsersPage from "./@users/page";
import NotificationsPage from "./@notifications/page";
import RevenuePage from "./@revenue/page";
export default async function ComplexDashboardLayout({
    children,
    users,
    notifications,
    revenue
}:{
    children:React.ReactNode;
    users:React.ReactNode;
    notifications:React.ReactNode;
    revenue:React.ReactNode;
}){
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return(
       <div className="text-gray-700 w-full min-h-screen p-2 m-auto ">
         {children}
       <div className="grid grid-cols-2 p-5 gap-4 ">
        <div className="">
            {users}
            {revenue}
        </div>
        <div>{notifications}</div>
        


       </div>
       </div>
    )

}