import React, {useEffect, useCallback} from "react";
import {useRouter} from 'next/router'
import {
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from 'react-hook-form'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Content: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");

  const buttonOnClick = useCallback(() => {
    console.log(value)
  }, [value])

  const onSubmit = useCallback((values) => {
    console.log(values)
    router.push('/')
  }, [])
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl id="title" isRequired>
          <FormLabel htmlFor="Title">Title</FormLabel>
          <Input
            placeholder="Title"
            name="Title"
          />
        </FormControl>
        <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <ButtonGroup variant="outline" spacing="6">
          <Button
            colorScheme="blue"
            //onClick={buttonOnClick}
            type="submit"
          >
            Save
          </Button>
          <Button
            onClick={() => router.push('/')}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export default Content
