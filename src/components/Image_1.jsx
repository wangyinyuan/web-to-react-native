import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const leftImages = [
  {
    id: "7ce9b96e-16be-4d47-8c8a-b7561cffc3a7",
    url: "https://placedog.net/500/280?id=1",
  },
  {
    id: "d8218f71-5e46-4ba8-8dfa-a7c40b289921",
    url: "https://placedog.net/500/280?id=2",
  },
  {
    id: "6ca530e3-f4a9-47ee-b0bc-64fa3082a16d",
    url: "https://placedog.net/500/280?id=3",
  },
  {
    id: "94f98240-e5f4-4cf2-a106-c35cae79e2ae",
    url: "https://placedog.net/500/280?id=4",
  },
  {
    id: "b6321650-07b8-4883-b6af-f481740cf3c7",
    url: "https://placedog.net/500/280?id=5",
  },
  {
    id: "df9a8e07-fa64-4403-921e-94ea2671fbe2",
    url: "https://placedog.net/500/280?id=6",
  },
  {
    id: "063b742d-6e23-4b79-8f72-0c8f48d78316",
    url: "https://placedog.net/500/280?id=7",
  },
  {
    id: "49c5f63d-87c2-4f38-b8e6-3329fcdd5bb2",
    url: "https://placedog.net/500/280?id=8",
  },
];

const rightImages = [
  {
    id: "67fc4f16-5d38-4a9f-b1aa-b8c1c32d6034",
    url: "https://placedog.net/500/280?id=9",
  },
  {
    id: "b278390a-706a-49ac-a8ab-b14062f01724",
    url: "https://placedog.net/500/280?id=10",
  },
  {
    id: "5be07b07-35c3-4883-b2f9-a00dbb78671e",
    url: "https://placedog.net/500/280?id=11",
  },
  {
    id: "0231093b-accd-4c76-afea-0ccf78c7fde7",
    url: "https://placedog.net/500/280?id=12",
  },
  {
    id: "a17948ad-53d1-429b-b552-1ecc8e3cc500",
    url: "https://placedog.net/500/280?id=13",
  },
  {
    id: "b65922f0-6fc2-42ac-863a-9af7ef6ce61c",
    url: "https://placedog.net/500/280?id=14",
  },
  {
    id: "7dc76e5f-1ce0-4cb6-bc02-fda0b69cc1b5",
    url: "https://placedog.net/500/280?id=15",
  },
  {
    id: "cc7cc911-c754-4eb2-87e0-9830a3b0166e",
    url: "https://placedog.net/500/280?id=16",
  },
];

export function ImageWaterfall() {
  const styles = StyleSheet.create({
    container2: {
      display: "flex",
      flexDirection: "row",
    },
    image: {
      width: 300,
      marginBottom: 10,
      borderRadius: 10,
    },
    imagesColumn: {
      display: "flex",
      flexDirection: "column",
    },
    leftColumn: {
      marginRight: 10,
    },
    leftImage: {
      height: 200,
    },
  });

  const [rightImageComponents, setRightImageComponents] = useState([]);

  // 封装获取图片尺寸的方法
  const getImageSize = (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          resolve({ width, height });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      const components = await Promise.all(
        rightImages.map(async (image) => {
          try {
            const { height } = await getImageSize(image.url);
            return (
              <Image
                key={image.id}
                source={{ uri: image.url }}
                alt=""
                style={[styles.image, { height }]}
              />
            );
          } catch (error) {
            console.error("Failed to load image", error);
            return null;
          }
        })
      );
      setRightImageComponents(components);
    };
    loadImages();
  }, [rightImageComponents]);

  return (
    <ScrollView>
      <View style={styles.container2}>
        <View style={[styles.imagesColumn, styles.leftColumn]}>
          {leftImages.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.url }}
              alt=""
              style={[styles.image, styles.leftImage]}
            />
          ))}
        </View>
        <View style={styles.imagesColumn}>
          {rightImageComponents}
        </View>
      </View>
    </ScrollView>
  );
}
