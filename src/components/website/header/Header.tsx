import { Button } from '@/components/ui/button'
import { HeadsetIcon } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div>
        <div>
            <div>
                <h1>logo</h1>
            </div>
            <div>
                <h1>links</h1>
                <nav>
                    <ul>
                       <li>
                        MEN
                       </li>
                       <li>
                     WOMEN
                       </li>
                       <li>
                     KIDS
                       </li>
                       <li>
                     BEAUTY
                       </li>
                       <li>
                     OTHERS
                       </li>
                       <li>
                     NEW ARRIVALS
                       </li>
                       <li>
                     SALE
                       </li>
                    </ul>
                </nav>
            </div>
            <div>
                <h1>Search bar</h1>
            </div>
            <div>
               <nav>
                <ul>
                    <li>
                    <HeadsetIcon  />
                    </li>
                    <li>
                        <span>notification</span>
                    </li>
                    <li>
                        <span>user profile</span>
                    </li>
                    <li>
                        <span>heart</span>
                    </li>
                    <li>
                        <span>cart</span>
                    </li>
                   
                    
                    
                </ul>
               </nav>
            </div>
        </div>
    </div>
  )
}

export default Header