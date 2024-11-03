import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import ItemPickupList from '../components/ItemPickupList';
import NewItemPickup from './NewItemPickup';



function DonorDashboard({ session, authentication, router, appTheme, branding }) {
    function AddItemPickupButton() {

        return <Button variant='outlined' startIcon={<Add fontSize="small" />} onClick={() => router.navigate('/new-donation')}>
            Make Donation
        </Button>
    }

    const [items, setItems] = React.useState([])
    const reqVolPickup = async (item) => {
        let token = localStorage.getItem('accessToken')
        try {
            await axios.post("http://127.0.0.1:8000/api/donor/pickup/request", { id: item.id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            getDonorPickups()
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }

    const getDonorPickups = async () => {
        let token = localStorage.getItem('accessToken')
        try {
            const res = await axios.get("http://localhost:8000/api/donor/myrequests", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setItems(res.data)
        } catch (err) {
            alert('Something went wrong')
            console.error(err)
        }
    }

    React.useEffect(() => {
        getDonorPickups()
    }, [])

    const renderDashboard = (pathname) => {
        if (pathname === '/new-donation') return <NewItemPickup goBack={() => router.navigate('/donation')} />
        return <ItemPickupList afterConfirmFn={reqVolPickup} buttonText={"Request Pickup"} items={items} />
    }

    return (
        // preview-start
        <AppProvider
            session={session}
            authentication={authentication}
            router={router}
            theme={appTheme}
            branding={branding}
        >
            <DashboardLayout
                slots={{ toolbarActions: AddItemPickupButton }}
                hideNavigation
            >
                {
                    renderDashboard(router.pathname)
                }
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

DonorDashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DonorDashboard;

