import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeScreen } from "@/components/template";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/AppStore";
import { useEffect, useState } from "react";
import { TextL, TextM, TextS } from "@/components/derivatives/text";
import colors from "@/configs/colors";
import { IGetListSemuaDokterResponse } from "@/types/commonTypes";
import { Image } from "moti";
import Gap from "@/components/generics/gap/Gap";
import { CLockOrangeSvg, ClockBlueSvg, LocationSvg } from "@/theme/svgs";

function Jadwal() {
  const dataUser = useSelector((state: RootState) => state.dataUser);
  const [listDokter, setListDokter] = useState<
    IGetListSemuaDokterResponse["response"]["data"]
  >([]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["jadwal-list-dokter"],
    mutationFn: async (payload: string) => {
      const response = await fetch(
        "https://nexacaresys.codeplay.id/api/doctor",
        {
          body: payload,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${dataUser.token}`,
          },
        }
      );
      if (!response.ok) throw new Error(JSON.stringify(response));
      return response;
    },
  });

  useEffect(() => {
    if (dataUser.token) {
      mutate("", {
        onSuccess: async (data) => {
          const response: IGetListSemuaDokterResponse = await data?.json();
          setListDokter(response.response.data);
        },
        onError: (error) => {
          console.log("🚀 ~ onError: ~ error", error);
        },
      });
    }
  }, [dataUser?.token]);

  return (
    <SafeScreen>
      <ScrollView
        style={{ flexDirection: "row", maxHeight: 80, paddingTop: 24 }}
        horizontal
      >
        <TouchableOpacity style={styles.topTapBar}>
          <TextL
            align="center"
            textStyle="semiBold"
            color={colors.text.titleIcon}
          >
            Dibatalkan
          </TextL>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topTapBar}>
          <TextL
            align="center"
            textStyle="semiBold"
            color={colors.text.titleIcon}
          >
            Jadwal Dokter
          </TextL>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topTapBar}>
          <TextL
            align="center"
            textStyle="semiBold"
            color={colors.text.titleIcon}
          >
            Semua
          </TextL>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView style={styles.container}>
        {isPending && <TextM>Loading...</TextM>}
        {listDokter?.map((dokter) => (
          <View style={styles.cardDokter}>
            <TouchableOpacity>
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* Left Contenct */}
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={require("@/theme/assets/images/dokter-imran.png")}
                    style={{
                      width: 56,
                      height: 56,
                      resizeMode: "cover",
                    }}
                  />
                  <Gap width={12} />
                  <View style={{ justifyContent: "space-between" }}>
                    <TextL textStyle="bold" line={17.6}>
                      {dokter?.nama}
                    </TextL>
                    <TextM color={colors.text.grey}>{dokter.jenis}</TextM>
                  </View>
                </View>
              </View>

              {/* Lines */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(245, 245, 245, 1)",
                  paddingVertical: 8,
                }}
              />

              {/* Footer */}
              <View
                style={{
                  paddingTop: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CLockOrangeSvg />
                  <Gap width={8} />
                  <TextS>{dokter.tanggal}</TextS>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: 20,
                  }}
                >
                  <ClockBlueSvg />
                  <Gap width={8} />
                  <TextS>{dokter.jadwal}</TextS>
                </View>
              </View>

              <Gap height={16} />

              <TouchableOpacity style={styles.topTapBar}>
                <TextL
                  align="center"
                  textStyle="semiBold"
                  color={colors.text.titleIcon}
                >
                  Detail
                </TextL>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeScreen>
  );
}

export default Jadwal;
