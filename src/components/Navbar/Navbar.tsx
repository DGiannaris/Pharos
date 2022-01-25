import * as React from 'react';
import { 
  Application,
   groupByKey, 
   sortLayers, 
   Layer1Type, 
   Layer2Type
} from '../../common/utils';
import { TREE_KEYS } from '../../common/constants';
import './styles.css';


interface Props {
  data: Application[],

}

/**
 * The navigation component, an expandable/substractable ol
 * @param data The tree of data, and its levels
 * @returns 
 */
export const Navbar: React.FC<Props> = ({ data }: Props) => {
  const tree = sortLayers(groupByKey(data, TREE_KEYS))
  // I used an object instead of an array ause objects are faster in retrieval

  const [isOpen, setOpen] = React.useState({ child: '', grandchild: '' } as Record<string, string | undefined>);
  const onClickParent = (event: any, name: string) => {
    event.stopPropagation();
  
    if (name === isOpen.child) {
      const { child: removedProperty, ...isOpenRest } = isOpen;
      setOpen({...isOpenRest});
      return;
    }
    setOpen({ ...isOpen, child: name })
  }

  const onClickChild = (event: any, name: string) => {
    event.stopPropagation();

    if (name === isOpen.grandchild) {
      const { grandchild: removedProperty, ...isOpenRest } = isOpen;
      setOpen({...isOpenRest});
      return;
    }
    setOpen({ ...isOpen, grandchild: name })
  }

  return (
    <div className='wrapper'>
      <ol>   
          {
            tree.map( (lvl1: Layer1Type, idx: number) => (
              <li 
                key={`${lvl1.name}${idx}`}
                onClick={(e) => onClickParent(e, lvl1.name)}
              >
                {`${lvl1.name}`}
                <ol className={isOpen.child === lvl1.name ? 'vis' : 'invis'}>
                  {
                    sortLayers(lvl1.children).map((lvl2: Layer2Type, idx: number) => (
                      <li 
                        key={`${lvl2.name}${idx}`}
                        onClick={(e) => onClickChild(e, lvl2.name)}

                      >
                        {`${lvl2.name}`}
                        <ol className={isOpen.grandchild === lvl2.name ? 'vis' : 'invis'}>
                          {
                            sortLayers(lvl2.grandChildren).map((lvl3: Application, idx: number) => (
                              <li 
                                key={`${lvl3.name}${idx}`}
                               
                              >
                                {`${lvl3.BCAP3}`}
                              </li>
                            ))
                          }
                        </ol>                      
                      </li>
                    ))
                  }
                </ol>
              </li>
            ))
          }
      </ol>
    </div>
  );
}
