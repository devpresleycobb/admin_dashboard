import MenuItemHeader from "../MenuItemHeader";

export default function Drawer() {
    const Menu = [
        {
            title: 'Apps',
            children: [
                {
                    title: 'Email',
                    icon: 'email',
                    children: []
                },
                {
                    title: 'Users',
                    icon: 'person',
                    children: [
                        {
                            title: 'List',
                            children: []
                        },
                        {
                            title: 'View',
                            children: []
                        },
                        {
                            title: 'Edit',
                            children: []
                        },
                    ]
                }
            ]
        }
    ]
                
    const children = Menu.map( (headings, index) => <MenuItemHeader
                                                        key={index}
                                                        children={headings.children}
                                                        title={headings.title}/>)
  return (
    <div className={'h-screen bg-component overflow-hidden transition-w duration-200 ease-in-out w-56'} >
        <div className={'py-4 text-center block'}>Dashboard</div>
        <hr/>
        <div className={'pt-4 px-6'}>
            {children}
        </div>
    </div>
  )
}
