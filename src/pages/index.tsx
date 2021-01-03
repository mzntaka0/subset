import Head from 'next/head'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import ForceGraph3D from 'react-force-graph-3d'
import useSWR from 'swr'
import SpriteText from 'three-spritetext'
import { AiOutlineEdit } from "react-icons/ai";
import {HStack, Heading} from '@chakra-ui/react'
import { signIn, useSession } from "next-auth/client"
import type { GetServerSideProps } from "next";
import prisma from "lib/prisma";

import styles from '../styles/Home.module.css'
import {fetcher} from 'lib/services'


const NoSSRForceGraph = dynamic(() => import('../lib/nossr/NoSSRForceGraph'), {
  ssr: false,
});


export default function Page(props) {
  console.log(props)
  //const {data: sampleData} = useSWR('/miserables.json', fetcher)
  const router = useRouter()
  const {data: sampleData} = useSWR('/miserables.json', (key) => fetch(key).then(res => res.json()))
  const [session, loading] = useSession()
  return (
    <>
      {
        session ? (
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
        ) : (
					<p>
						<p>You are not permitted to see this page.</p>
						<button onClick={signIn}>Sign in</button>
					</p>
        )
      }
    </>
  )
}


type Props = {
  count: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const count = await prisma.user.count();
  return {
    props: {
      count,
    },
  };
};
