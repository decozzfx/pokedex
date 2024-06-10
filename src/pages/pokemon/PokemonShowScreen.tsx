import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { FC, useEffect } from "react";
import {
  Badge,
  Evolution,
  Information,
  PokemonDetailLayout,
  Section,
  Statistic,
} from "@components";
import { constant, helper, theme } from "@utils";
import { Text } from "@ui-kitten/components";
import { http } from "@services";
import { PageProps } from "@types";
import { useDispatch } from "react-redux";
import { setPokemonDetail } from "src/redux/actions/pokemonDetailAction";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchPokemonDetail = async (id: string) => {
  try {
    const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    return req.data;
  } catch (error) {}
};

const PokemonShowScreen: FC<PageProps<"PokemonShow">> = ({ route }) => {
  const pokemonId = route.params.id;
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["detail-pokemon", pokemonId],
    queryFn: async () => await fetchPokemonDetail(pokemonId),
    enabled: !!pokemonId,
  });
  const detail = data;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(
  //       setPokemonDetail({
  //         num: data?.num,
  //         name: data?.name,
  //         hp: detail?.stats["hp"],
  //         colorTheme: helper.getPokemmonColor(detail?.types[0]),
  //       })
  //     );
  //   }
  // }, [isSuccess, route.params.id]);

  return (
    <PokemonDetailLayout isLoading={isLoading}>
      {isSuccess && (
        <View>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
              }}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
          <Text style={styles.title} category="h4">
            {data.name}
          </Text>
          {/* <View style={styles.type}>
            {detail?.types.map((type: string, key: number) => (
              <Badge
                key={`badge-${key}`}
                style={key !== 0 && styles.gap}
                title={type}
                color={helper.getPokemmonColor(type.toLocaleLowerCase())}
              />
            ))}
          </View>
          <Section title="Information" style={styles.section}>
            <Text style={styles.paragraph}>{detail?.description}</Text>
            <View style={styles.information}>
              <Information title="Weight" value={`${detail?.weight} KG`} />
              <Information title="Height" value={`${detail?.height} M`} />
              <Information
                title="Abilities"
                value={`${detail?.abilities.toString().replace(",", ", ")}`}
              />
              <Information title="Specie" value={`${detail?.specie}`} />
            </View>
          </Section>
          <Section title="Statistic Basic" style={styles.section}>
            <Statistic
              colorTheme={helper.getPokemmonColor(detail?.types[0])}
              title={"HP"}
              value={detail?.stats["hp"]}
            />
            <Statistic
              colorTheme={helper.getPokemmonColor(detail?.types[0])}
              title={"Attack"}
              value={detail?.stats["attack"]}
            />
            <Statistic
              colorTheme={helper.getPokemmonColor(detail?.types[0])}
              title={"Defense"}
              value={detail?.stats["defense"]}
            />
            <Statistic
              colorTheme={helper.getPokemmonColor(detail?.types[0])}
              title={"Speed"}
              value={detail?.stats["speed"]}
            />
            <Statistic
              colorTheme={helper.getPokemmonColor(detail?.types[0])}
              title={"SP Attack"}
              value={detail?.stats["speedAttack"]}
            />
            <Statistic
              colorTheme={helper.getPokemmonColor(detail?.types[0])}
              title={"SP Defense"}
              value={detail?.stats["speedDefense"]}
            />
          </Section>
          {detail?.evolutions.length > 0 && (
            <Section title="Evolutions">
              <ScrollView
                horizontal
                contentContainerStyle={styles.section}
                showsHorizontalScrollIndicator={false}
              >
                {detail?.evolutions.map((evolution: string, key: number) => (
                  <Evolution
                    key={`evolution-${key}`}
                    name={evolution}
                    colortTheme={helper.getPokemmonColor(detail?.types[0])}
                    isLast={detail?.evolutions.length === key + 1}
                  />
                ))}
              </ScrollView>
            </Section>
          )} */}
        </View>
      )}
    </PokemonDetailLayout>
  );
};

export default PokemonShowScreen;

const styles = StyleSheet.create({
  type: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: constant.container,
  },
  gap: {
    marginLeft: 10,
  },
  title: {
    ...theme.textCenter,
    ...theme.fontMedium,
    marginBottom: 10,
  },
  paragraph: {
    lineHeight: 23,
  },
  information: {
    marginTop: 16,
  },
  section: {
    paddingHorizontal: 15,
  },
});
