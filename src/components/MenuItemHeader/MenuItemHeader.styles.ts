import { useAppSelector } from "@/app/hooks";
import { selectDrawerToggled } from "@/features/drawer/drawerSlice";

export default () => {
        const toggled = useAppSelector(selectDrawerToggled)
        return {
            mainList: toggled ? '' : 'flex flex-col items-center',
            headerTitle: toggled ? '' : 'hidden',
        }
    }