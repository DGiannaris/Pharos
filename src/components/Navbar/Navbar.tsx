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
  onSelect: (data: Application[]) => void;
}

/**
 * The navigation component, an expandable/substractable ol
 * @param data The tree of data, and its levels
 * @returns 
 */
export const Navbar: React.FC<Props> = ({ data, onSelect }: Props) => {
  const tree = sortLayers(groupByKey(data, TREE_KEYS))
  // I used an object instead of an array ause objects are faster in retrieval

  const [isOpen, setOpen] = React.useState({ child: '', grandchild: '' } as Record<string, string | undefined>);
  const [selected, setSelected] =React.useState('');
  
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
                className={`first ${isOpen.child === lvl1.name ? 'opened':'closed'}`}
              >
                {`${lvl1.name}`}
                <ol className={isOpen.child === lvl1.name ? 'vis' : 'invis'}>
                  {
                    sortLayers(lvl1.children).map((lvl2: Layer2Type, idx: number) => (
                      <li 
                        key={`${lvl2.name}${idx}`}
                        onClick={(e) => onClickChild(e, lvl2.name)}
                        className={`second ${isOpen.grandchild === lvl2.name ? 'opened':'closed'}`}
                      >
                        {`${lvl2.name}`}
                        <ol className={isOpen.grandchild === lvl2.name ? 'vis' : 'invis'}>
                          {
                            sortLayers(lvl2.children).map((lvl3: Layer2Type, idx: number) => (
                              <li 
                                key={`${lvl3.name}${idx}`}
                                className= {`third last ${selected === lvl3.name ? 'selected': ''}`}
                                onClick={ (e) => {
                                  e.stopPropagation();
                                  onSelect(lvl3.grandChildren);
                                  setSelected(lvl3.name);
                                }}
                              >
                                {`${lvl3.name}`}
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
