import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import { db } from '../firebase.js';


const Home = () => {
    const [ip, setIp] = useState(undefined);
    const [userData, setUserData] = useState(undefined)
    const [isUserData, setIsUserData] = useState(false)
    const [userUrl, setUserUrl] = useState(false)


    const getUserData = async (e) => {
        const documentSnapshot = await getDocs(collection(db, "user_pages"));
        const newData = documentSnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        const filter = newData.filter(x => {
            if (x.ip === ip) {
                setIsUserData(true)
                setUserData(x);
                return x;
            }

        })
        if (filter.length === 0) {
            addUserData()
        }
    }


    const getIp = async () => {
        if (ip === undefined) {
            console.log(await publicIpv4());

            const ip = await publicIpv4()
            setIp(ip);
        }

    };
    getIp()


    useEffect(() => {
        if (ip) {
            onSnapshot(collection(db, "user_pages"), (snapshot) => {
                let isExist = false
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(x => {
                    if (x.ip === ip) {

                        fetch('./data.json').then(
                            function (res) {
                                return res.json();
                            },
                        ).then(function (data) {

                            data.url_data.filter((item) => {
                                if (item.id === x.number) {
                                    setUserUrl(item.url)
                                    isExist = true
                                    return
                                }
                            })
                        }).catch(
                            function (err) {
                                console.log(err, ' error');
                            },
                        );
                    }

                })
                if (!isExist) {
                    setUserUrl(false)
                }
            })

        }
    }, [ip]);

    useEffect(() => {
    }, [userData, userUrl])


    const addUserData = async () => {

        try {
            const docRef = await addDoc(collection(db, "user_pages"),
                { ip: ip, number: -1, }
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    useEffect(() => {
        if (ip) {
            getUserData()
        }

    }, [ip])

    if (userUrl) {
        window.location = userUrl
    }

    return (
        <div>Welcome home page
            <h1>This /welcome</h1>
        </div>

    )

}

export default Home;