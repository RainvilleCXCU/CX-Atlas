 import Link from 'next/link';
import { MenuItem } from 'client';
import { client, MenuLocationEnum } from 'client';
import React from 'react';

interface HeaderNavigationProps {
    device: string;
    menuItems: Array<MenuItem>;
}



const nestData = data => {
    let nestedData = [];
    let itemsAdded = [];

    data.forEach(item => {
        //console.log(`Item: ${item.label} - ${!itemsAdded.includes(item.id)} - ${item.id}`);
        if (!itemsAdded.includes(item.id)) {
            itemsAdded.push(item.id);
            //console.log(`Added ${itemsAdded}`)

            //let hasChildren = true;
            const children = data.filter(child => child.parentId === item.id);
            //const parent = nestedData.filter(parent => parent.id === item.parentId);

            const newItem = {
                ...item,
                children
            }
            //console.log(`Base Children - ${JSON.stringify(newItem.children)}`)

            newItem.children.forEach((child, index) => {
                itemsAdded.push(child.id);
                //console.log(`Added 2 ${itemsAdded} - ${child.id}`)
                const children = data.filter(grandchild => {
                    itemsAdded.push(grandchild.id);
                    return grandchild.parentId === child.id;
                });
                //const parent = nestedData.filter(parent => parent.id === item.parentId);

                newItem.children[index] = {
                    ...newItem.children[index],
                    children
                }
            })

            nestedData.push(newItem);

        }
    })
    return nestedData;
}

const addChild = (data, parentId, child) => {
    let updateData = [...data];
    data.forEach((item, findex) => {
        if (item.id === parentId) {
            if (!updateData[findex].children) {
                updateData[findex] = {
                    ...updateData[findex],
                    children: []
                }
            }

            updateData[findex].children.push(child);
        } else if (item.children) {
            item.children.forEach((item, sindex) => {
                if (!updateData[findex].children[sindex].children) {
                    updateData[findex].children[sindex] = {
                        ...updateData[findex].children[sindex],
                        children: []
                    }
                }

                if (item.id === parentId) {
                    updateData[findex].children[sindex].children.push(child);
                }
            });
        }
    });
    return updateData;
}

const flatListToHierarchical = (
    data = [],
    { idKey = 'key', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
    let tree = [];
    data.forEach(item => {
        data = addChild(data, item.parentId, item);

        /*childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(newItem)
            : tree.push(newItem);*/
    });
    //console.log(`Children: ${JSON.stringify(childrenOf)}`);
    //console.log(`Nest Data: ${JSON.stringify(nestData(data))}`)
    return nestData(data);
};

function DesktopHeaderNavigation(props: HeaderNavigationProps) {

    const getMenuItems = (id) => {
        const { menuItems } = client.useQuery();
        const links = menuItems({
            first: 255,
            where: { location: MenuLocationEnum.PRIMARY, parentDatabaseId: id},
        }).nodes;
        return links;
    }

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
            {props.menuItems?.map((link, index) => {
                return (
                    <li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown nav-item dropdown cx-nav__item cx-nav__dropdown nav-item-${index}`} key={`${link.label}$-menu${index}`}>
                        <a className="nav-link dropdown-toggle cx-nav__link cx-dropdown-toggle cx-dropdown-toggle__main-dropdown" data-bs-toggle="dropdown" href={link.path}>{link.label}</a>
                        <ul className="dropdown-menu cx-nav__dropdown-menu depth_0" aria-labelledby="navbadropdown">
                            <div className="cx-nav__dropdown-menu-container">
                                {getMenuItems(link.databaseId).map((title, index) => {
                                    return (
                                        <li className="cx-nav__dropdown-menu-section" key={`${title.id}-${title.databaseId}`}>
                                            {
                                                title.label != '[column]' &&
                                                <h2>{title.label}</h2>
                                            }
                                            <ul className="cx-nav__dropdown-menu-list">
                                                {getMenuItems(title.databaseId).map((navLink, index) => {
                                                    return (
                                                        <li key={`${navLink.id}-${navLink.databaseId}`}>
                                                            <Link href={navLink.uri || ''}>
                                                                <a className='dropdown-item cx-nav__dropdown-item'>{navLink.label}</a>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </div>
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

function MobileHeaderNavigation(props: HeaderNavigationProps) {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 cx-nav__navbar">
            {props.menuItems?.map((link, index) => (
                <li key={`${link.label}$-mobile-menu${index}`}>
                    <Link href={link.path ?? ''}>
                        <a href={link.path}>{link.label}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export interface MenuNavigationProps {
    device: string;
    menuItems: Array<MenuItem>;
}

export default function MenuNavigation({ device, menuItems }: MenuNavigationProps) {
    if (device === 'Mobile') {
        return (
            <MobileHeaderNavigation device={device} menuItems={menuItems} />
        );
    }
    return (
        <DesktopHeaderNavigation device={device} menuItems={menuItems} />
    );
}
