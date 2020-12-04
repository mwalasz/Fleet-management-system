import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
} from 'react-google-maps';
import fontawesome from 'fontawesome-markers';

const Map = withScriptjs(
    withGoogleMap((props) => {
        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={props.coords[parseInt(props.coords.length / 2)]}
            >
                {props.isMarkerShown && (
                    <>
                        <Marker
                            position={props.coords[0]}
                            title={'Start'}
                            icon={startMarkeStyle}
                        />
                        <Marker
                            position={props.coords[props.coords.length - 1]}
                            title={'Stop'}
                            icon={endMarkerStyle}
                        />
                    </>
                )}
                {props.isRouteShown && (
                    <Polyline
                        path={props.coords}
                        geodesic
                        options={routeStyle}
                    />
                )}
            </GoogleMap>
        );
    })
);

const routeStyle = {
    strokeColor: '#3676b5',
    strokeWeight: 4,
};

const startMarkeStyle = {
    path: fontawesome.PLAY_CIRCLE,
    scale: 0.5,
    strokeWeight: 0.2,
    fillColor: '#7FFF00',
    fillOpacity: 0.7,
};

const endMarkerStyle = {
    path: fontawesome.STOP_CIRCLE,
    scale: 0.5,
    strokeWeight: 0.2,
    fillColor: '#FF0000',
    fillOpacity: 0.7,
};

export default Map;
