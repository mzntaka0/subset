import Head from 'next/head'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import ForceGraph3D from 'react-force-graph-3d'
import useSWR from 'swr'
import SpriteText from 'three-spritetext'
import { AiOutlineEdit } from "react-icons/ai";
import {HStack, Heading} from '@chakra-ui/react'

import styles from '../styles/Home.module.css'
import {fetcher} from 'lib/services'


const NoSSRForceGraph = dynamic(() => import('../lib/nossr/NoSSRForceGraph'), {
  ssr: false,
});


export default function Home() {
  //const {data: sampleData} = useSWR('/miserables.json', fetcher)
  const {data: sampleData} = useSWR('/miserables.json', (key) => fetch(key).then(res => res.json()))
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HStack>
        <Heading>
          subset
        </Heading>
        <AiOutlineEdit
          onClick={() => router.push('/edit')}
        />
      </HStack>
      <NoSSRForceGraph
        graphData={sampleData}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
          console.log(node)
          // @ts-ignore
          const sprite = new SpriteText(node.id);
          // @ts-ignore
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
        onNodeClick={(node, _event) => {
          console.log(node.id)
        }}
        onNodeRightClick={(node, _event) => {
          console.log(node.id)
        }}
      />
    </div>
  )
}
