import { createContext, useEffect, useState } from "react";

const Context = createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])

    const toggleFavorite = (id) => {
        let updatedPhotos = allPhotos.map(photo => {
            if(id === photo.id) {
                return { ...photo, isFavorite: !photo.isFavorite }
            }
            return photo
        })
        setAllPhotos(updatedPhotos)
    }
    
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json")
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, [])

    return (
        <Context.Provider value={{allPhotos, toggleFavorite}}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }

// https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings