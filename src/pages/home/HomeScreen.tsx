import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FooterLoading, Loading, MainLayout, Pokemon } from "@components";
import { http } from "@services";
import { PokemonResultProps, SearchStateProps } from "@types";
import { useInfiniteQuery } from "@tanstack/react-query\
";
import { constant } from "@utils";
import { useSelector } from "react-redux";
import { State } from "src/redux/reducer";
import axios from "axios";

const HomeScreen = () => {
  const searchState: SearchStateProps = useSelector(
    (state: State) => state.search
  );
  const fetchData = async ({ pageParam = 0 }) => {
    const url =
      searchState.data.length > 0
        ? `search?query=${searchState.data}&offset=${pageParam}&limit=20`
        : `?offset=${pageParam}&limit=100`;
    const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${url}`);
    return req.data ?? [];
  };

  const { data, isLoading, isSuccess, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["pokemons", searchState.data],
      queryFn: fetchData,
      initialPageParam: 0,
      getNextPageParam: (data) => {
        const offsetRegex = /[?&]offset=([^&]*)/;
        const offsetValue = data?.next?.match(offsetRegex)?.[1] ?? 0;
        if (data.results.length === data.count) {
          return undefined;
        } else {
          return offsetValue;
        }
      },
    });

  const handleLoadMore = () => (hasNextPage ? fetchNextPage() : null);

  return (
    <MainLayout isLoading={isLoading}>
      {isSuccess && (
        <FlatList
          data={data?.pages?.[0]?.results ?? []}
          contentContainerStyle={styles.flatlist}
          keyExtractor={(val, index) => val.name + index}
          onEndReached={handleLoadMore}
          numColumns={2}
          extraData={data?.pages?.[0]?.results}
          ListEmptyComponent={() => <Text>No data found</Text>}
          ListFooterComponent={() => (isFetching ? <FooterLoading /> : null)}
          renderItem={({ item, index }) => (
            <Pokemon key={`pokemon-${item.name + index}`} {...item} />
          )}
        />
      )}
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlist: {
    paddingHorizontal: constant.container,
    paddingTop: 20,
    paddingBottom: 40,
  },
});
