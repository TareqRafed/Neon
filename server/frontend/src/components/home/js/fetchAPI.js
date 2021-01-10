import { useEffect, useReducer, useCallback, useRef } from 'react';
import * as ACTIONS from './actions';
import axios from 'axios';

export default function GetImages() {

    const imgReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.STACK_IMAGES:
                return { ...state, images: state.images.concat(action.images) }
            case ACTIONS.FETCHING_IMAGES:
                return { ...state, fetching: action.fetching }
            default:
                return state;
        }
    }

    const pageReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.ADVANCE_PAGE:
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })
    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 })



    useEffect(() => {
        imgDispatch({ type: ACTIONS.FETCHING_IMAGES, fetching: true })
        axios.get(`http://127.0.0.1:8000/artwork/?page=${pager.page}`) // 10 images per page # server/neon/pagination.py in case you want to change it
            .then(data => data.data.results)
            .then(images => {

                imgDispatch({ type: ACTIONS.STACK_IMAGES, images })
                imgDispatch({ type: ACTIONS.FETCHING_IMAGES, fetching: false })
            })
            .catch(e => {
                // images all are loaded
                imgDispatch({ type: ACTIONS.FETCHING_IMAGES, fetching: false })
                return e
            })
    }, [imgDispatch, pager.page])


    let bottomBoundaryRef = useRef(null);
    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        pagerDispatch({ type: ACTIONS.ADVANCE_PAGE });
                    }
                });
            }).observe(node);
        },
        [pagerDispatch]
    );
    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
        }
    }, [scrollObserver, bottomBoundaryRef]);



    return [imgData, bottomBoundaryRef];

}