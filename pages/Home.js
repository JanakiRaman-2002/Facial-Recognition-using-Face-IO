import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [youtubeID] = useState('dQw4w9WgXcQ')
  
  return (
    <div>
      <div className="App">
      <p>hello</p>
      <iframe id='myiframe' className='video'
        title='Youtube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://youtube.com/embed/${youtubeID}?autoplay=1&mute=1`}>
</iframe>
      </div>
    </div>
  )
}
