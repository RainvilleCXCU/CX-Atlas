import { client } from 'client';
import Link from 'next/link';
import SearchBar from './SearchBar';
import UtilityNavLinks from './UtilityNavLinks';

export default function UtilityNav({ children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    return (
        <>
            <ul className="cx-header__util-nav-list">
                <li>
                    <SearchBar device="desktop" />
                </li>
                <UtilityNavLinks device="desktop" />
            </ul>
        </>
    )
};