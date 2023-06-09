import React, {CSSProperties, FC} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import {Place} from 'shared/entities'
import AccommodationPlaceMarker from './AccommodationPlace'
import PlacesClusterGroups from './PlacesClusterGroups'
import {LatLngExpression} from 'leaflet'
import UpdatePosition from './UpdatePosition'
import Routing from './Routing'
import 'leaflet/dist/leaflet.css'
import {useAppSelector} from 'shared/hooks'

type MapProps = {
    center?: LatLngExpression
    zoom?: number
    style?: CSSProperties
    accommodation?: Place
    places?: Place[]
    routePoints?: { places: Place[], ways: { type: 'car' | 'foot', points: [number, number][] }[] }
}

const Map: FC<MapProps> = ({
                               center = [63.3109245, 135],
                               zoom = 4,
                               style,
                               accommodation,
                               places,
                               routePoints
                           }) => {
    places = places?.filter(place => place.id !== accommodation?.id)
    const selectedWay = useAppSelector(state => state.travel.selectedWay)

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={style}
            attributionControl={false}
        >
            <TileLayer url="http://localhost:8081/tile/{z}/{x}/{y}.png"/>
            {!!accommodation && <AccommodationPlaceMarker accommodation={accommodation}/>}
            {!!places?.length && <PlacesClusterGroups places={places}/>}
            {!!routePoints?.places.length && <Routing points={routePoints}/>}
            <UpdatePosition center={center} zoom={zoom}/>
            {/*{*/}
            {/*    !!routePoints && routePoints.map((way, i) => {*/}
            {/*        if (way.type === 'car') {*/}
            {/*            const getCoordinates = async () => {*/}
            {/*                const coordinates = await fetch('https://routing.openstreetmap.de/routed-foot/route/v1/driving/131.89355897129474,43.10174465;131.90718475592584,43.101175299999994?overview=false&alternatives=true&steps=true&hints=;')*/}
            {/*                    .then(r => r.json())*/}
            {/*                    .then(r => r.routes[0].legs[0].steps.map((s: any) => s.intersections.map((i: any) => i.location)))*/}

            {/*                let result = []*/}

            {/*                for (let i = 0; i < coordinates.length; i++) {*/}
            {/*                    for (let j = 0; j < coordinates[i].length; j++) {*/}
            {/*                        result.push([coordinates[i][j][1], coordinates[i][j][0]])*/}
            {/*                    }*/}
            {/*                }*/}

            {/*                return result*/}
            {/*            }*/}

            {/*            const newPoints = await getCoordinates()*/}
            {/*            return <Polyline*/}
            {/*                key={way.id}*/}
            {/*                positions={newPoints}*/}
            {/*                pathOptions={{*/}
            {/*                    color: 'blue',*/}
            {/*                    weight: i === selectedWay ? 7 : 3,*/}
            {/*                    opacity: 0.7,*/}
            {/*                    dashArray: i === selectedWay ? '' : '30 10'*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        if (way.type === 'foot') {*/}
            {/*            return <Polyline*/}
            {/*                key={way.points[0][0]}*/}
            {/*                positions={way.points}*/}
            {/*                pathOptions={{*/}
            {/*                    color: 'red',*/}
            {/*                    weight: i === selectedWay ? 7 : 3,*/}
            {/*                    opacity: 0.7,*/}
            {/*                    dashArray: i === selectedWay ? '' : '30 10'*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        return null*/}
            {/*    })*/}
            {/*}*/}
        </MapContainer>
    )
}

export default Map