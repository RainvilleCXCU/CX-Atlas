import { client } from 'client';
import Link from 'next/link';

export default function Logo({ isH1 = false,children = <></> }) {
    const { useQuery } = client;
    const {title} = useQuery().generalSettings;
    return (
        <Link href="/" passHref className="cx-nav__logo">
          {title}
        </Link>
    )
};